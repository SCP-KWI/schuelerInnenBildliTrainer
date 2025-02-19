export const isNameValid = (inputName: string, expectedName: string): boolean => {
    const inputNameParts = inputName.trim().toLowerCase().split(' ');
    const expectedNameParts = expectedName.trim().toLowerCase().split(' ');

    if (inputNameParts.length !== expectedNameParts.length) {
        return false;
    }

    let typoCount = 0;

    for (let i = 0; i < inputNameParts.length; i++) {
        if (inputNameParts[i] !== expectedNameParts[i]) {
            typoCount++;
            if (typoCount > 1) {
                return false;
            }
        }
    }

    return true;
};