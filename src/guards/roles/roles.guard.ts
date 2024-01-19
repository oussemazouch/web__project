import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/docrators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { verify } from "jsonwebtoken";

//role guard will extract the role of the user from the payload and verify if it is among the roles authorized to access 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //requiredRoles object contains the roles authorized to access the given method
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    

    const req = context.switchToHttp().getRequest();
    //extract a header called authroization that will be like "Bearer eazsqduiaj" split(" ").pop() will return the jwt token after the Bearer word
    const token =req.headers['authorization'].split(" ").pop();
    try{
      const decodedToken=verify(token,process.env.SECRET);
      if(decodedToken["role"])
      {
        
        return requiredRoles.some((role) => decodedToken["role"]?.includes(role));
      }
      else{
        return req.status(401).send("Token Invalid");
      }

    }catch(e)
    {
      throw new UnauthorizedException()
    }
    
    
    
  }
}