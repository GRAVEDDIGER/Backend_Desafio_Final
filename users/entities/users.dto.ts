import { Prisma } from "@prisma/client";
export class CreateUsersDto implements Omit<Prisma.UsersCreateInput,"id"> {
    name!: string;
    username!: string;
    password!: string;
    phoneNumber!: number;
    address!: Prisma.AddressCreateNestedOneWithoutUsersInput;
}