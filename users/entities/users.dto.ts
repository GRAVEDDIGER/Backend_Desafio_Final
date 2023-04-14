import { Prisma } from "@prisma/client";
export class UsersDto implements Omit<Prisma.UsersCreateInput,"id"> {
    name!: string;
    username!: string;
    hash!: string;
    phoneNumber!: number;
    address!: Prisma.AddressCreateNestedOneWithoutUsersInput;
}