import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_mZ3vQvcgU",
    ClientId: "vsv8fv1lpi65qai0p31tp4dv7"
}

export default new CognitoUserPool(poolData)