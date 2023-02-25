import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { User_Role } from "src/comman_enum/user_role.enum";

export class userDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    username : string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password : string

    @IsEnum(User_Role)
    @IsNotEmpty()
    role: User_Role

    @IsNotEmpty()
    city:  string

    @IsNotEmpty()
    state: string

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    age: number
}

