export interface ILoginRequestData {
  /** admin 或 editor */
  username: "admin" | "editor";
  /** 密码 */
  password: string;
  /** 验证码 */
  // code: string;
}