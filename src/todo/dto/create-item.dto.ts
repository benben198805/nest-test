import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateToDoItemDto {

    @IsString({message: "标题必须字符串"})
    @IsNotEmpty({message: "标题不能不能为空"})
    readonly title: string;

    readonly checked: boolean;

    @IsNumber()
    @IsNotEmpty()
    readonly listId: number;
}
