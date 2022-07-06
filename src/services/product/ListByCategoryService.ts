import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){

        const findBycategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        })

        return findBycategory;

    }
}

export { ListByCategoryService }