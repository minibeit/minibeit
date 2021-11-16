import React, { useState } from "react";

import SignupFinish from "./SignupFinish";
import SignupForm from "./SignupForm";

export default function SignUpComponent() {
  const [finish, setFinish] = useState(false);

  return (
    <>{finish ? <SignupFinish /> : <SignupForm setFinish={setFinish} />}</>
  );
}
