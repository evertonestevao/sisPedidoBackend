import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    async execute({name, email, password}: UserRequest){

        //Verificar se enviou o email
        if (!email){
            throw new Error("Email incorreto")
        }

        // Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({ 
            where:{
                email: email
            }
        })

        if (userAlreadyExists){
            throw new Error("Esse e-mail já está cadastrado na plataforma")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })


        return user;

    }

}

export { CreateUserService }