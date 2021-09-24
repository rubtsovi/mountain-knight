import { nanoid } from "nanoid";
import { NotificationContext } from "../enums";
import { NotificationMessage } from "..";

export default class {
    private _id: string;

    private _isVisible: boolean;

    private _header: string | null;

    private _message: string;

    private _context: NotificationContext;

    constructor(obj: NotificationMessage);

    constructor(msg: string, header: string);

    constructor(msgOrObj: string | NotificationMessage, header?: string, context?: NotificationContext){

        this._isVisible = true;
        this._id = nanoid(10);

        if(typeof msgOrObj === "string"){
            this._message = msgOrObj;
            this._header = header ?? null;
            this._context = context ?? NotificationContext.DEFAULT;
        } else {
            this._message = msgOrObj.text;
            this._header = msgOrObj.header ?? null;
            this._context = msgOrObj.context ?? NotificationContext.DEFAULT;
        }
    }


    public get id(): string {
        return this._id;
    }


    public get header(): string | null{
        return this._header;
    }

    public get message(): string{
        return this._message;
    }

    public get context(): NotificationContext{
        return this._context;
    }

    public get isVisible(): boolean {
        return this._isVisible;
    }

    public set isVisible(value: boolean){
        this._isVisible = value;
    }
}
