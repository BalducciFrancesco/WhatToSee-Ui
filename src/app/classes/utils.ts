import { FormGroup } from "@angular/forms";

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

    public static async fileToBase64(f: File): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = () => {
                resolve(reader.result as string);
            };
        })
    }
}