import { NextResponse } from "next/server";
import { users } from "@/mocks/users";
import { ChangePasswordRequest } from "@/types/auth";

export async function PATCH(req: Request) {
  // get token
  const token = req.headers.get("token");

  if (!token) {
    return NextResponse.json(
      {
        message: "Token is required",
      },
      {
        status: 401,
      }
    );
  }

  // find logged user
  const user = users.find(
    (user) => user.token === token
  );

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  // get request body
  const body: ChangePasswordRequest = await req.json();

  // check current password
  if (user.password !== body.password) {
    return NextResponse.json(
      {
        message: "Current password is incorrect",
      },
      {
        status: 400,
      }
    );
  }

  // check new password
  if (body.password === body.newPassword) {
    return NextResponse.json(
      {
        message: "New password must be different from current password",
      },
      {
        status: 400,
      }
    );
  }

  // update password
  user.password = body.newPassword;

  return NextResponse.json(
    {
      message: "Password changed successfully",
    },
    {
      status: 200,
    }
  );
}