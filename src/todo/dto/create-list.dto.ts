import {IsNotEmpty, IsString} from "class-validator";
import {CreateToDoItemDto} from "./create-item.dto";

export class CreateToDoListDto {

    @IsString({message: "标题必须字符串"})
    @IsNotEmpty({message: "标题不能不能为空"})
    readonly title: string;

    readonly items: CreateToDoItemDto[];
}
