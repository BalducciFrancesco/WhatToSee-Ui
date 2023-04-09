import { FormGroup } from "@angular/forms";

export type NonEmptyFields<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};


export abstract class Utils  {
    public static findInvalidControls(form: FormGroup): string[] {
        const invalid = [];
        const controls = form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    /** 
     * Object casting for excluding null and undefined properties from object.
     */
    public static nonEmptyFieldsOf<T extends Object>(obj: T): NonEmptyFields<Required<T>> {
        const castedValue = {} as { [key: string]: any }
        Object.entries(obj).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                castedValue[key] = value
            }
        })
        return castedValue as NonEmptyFields<Required<T>>
    }
}