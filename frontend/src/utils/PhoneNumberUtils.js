export default function validatePhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
    return phoneNumber.length === 10;
}