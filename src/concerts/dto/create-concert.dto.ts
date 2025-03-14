import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, MinDate, Min, Validate, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

class ValidMinuteConstraint {
    validate(value: Date) {
        const minutes = value.getMinutes();
        return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].includes(minutes);  
    }
}

export class CreateConcertDto {
    @IsString()
    @IsNotEmpty()
    artist: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => {
        const date = new Date(value);
        date.setSeconds(0, 0);
        return date;
    })
    @MinDate(new Date(), { message: "A kezdési idő nem lehet a múltban!" })
    @Validate(ValidMinuteConstraint)
    stime: Date;

    @IsInt()
    @Min(1) 
    duration: number;

    @IsBoolean()
    @IsOptional()
    isCancelled?: boolean = false;
}
