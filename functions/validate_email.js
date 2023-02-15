const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export default function validateEmail(email) {
  return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
}
