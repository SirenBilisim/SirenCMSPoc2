import { Mode } from "../_enums/mode.enum";

export class ModalHelper {


    public static getModalTitle(modalMode: Mode, readOnlyTitle?: string): string {
        if (modalMode === Mode.READONLY) {
            return readOnlyTitle ? readOnlyTitle : "Details";
        }
        else if (modalMode === Mode.ADD) {
            return "Create";
        } else {
            return "Edit";
        }
    }
}