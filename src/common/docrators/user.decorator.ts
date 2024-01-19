import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";
import { verify } from "jsonwebtoken";
//custom decorator that is user to retrieve the email of the User

export const UserEmail = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      const token =req.headers['authorization'].split(" ").pop();
      try{
        const decodedToken=verify(token,process.env.SECRET);
        if(decodedToken['email'])
        {
          return decodedToken['email'];
        }
        else return "";
  
      }catch(e)
      {
        throw new UnauthorizedException()
      }
      
    },
  );