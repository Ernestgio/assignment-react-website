import {
  LoginResponse,
  RegisterResponse,
  TopupResponse,
} from "../interfaces/api";

const baseURL = "http://localhost:8080/";

export const makeRegisterRequest = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  console.log(
    JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    })
  );
  const response = await fetch(baseURL + "register", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
  });

  const data = await response.json();

  return {
    code: data.code,
    message: data.message,
  };
};

export const makeLoginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse | undefined> => {
  try {
    const response = await fetch(baseURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const body = await response.json();
    return body;
  } catch (err) {
    console.log(err);
  }
};

export const makeTopupRequest = async (
  amount: number,
  source_of_fund_id: number,
  cookie: string
): Promise<TopupResponse | undefined> => {
  try {
    const response = await fetch(baseURL + "transactions/top-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        amount,
        source_of_fund_id,
      }),
    });
    const { code, message, data } = await response.json();
    return { code, message, data };
  } catch (err) {
    console.log(err);
  }
};
