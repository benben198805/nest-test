import {IsNotEmpty, IsString} from "class-validator";

export class CreateToDoItem {

    @IsString({message: "标题必须字符串"})
    @IsNotEmpty({message: "标题不能不能为空"})
    readonly title: string;

    readonly checked: boolean;

    @IsString()
    @IsNotEmpty()
    readonly listId: string;
}
