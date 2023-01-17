export interface StatusRepresentation {
  status: number;
  group: string;
  hexColor: string;
}

export function getStatesRepresentation(status: number): StatusRepresentation {
  if (status >= 100 && status <= 199) {
    return {
      status: status,
      group: "Informational",
      hexColor: "#4DB531"
    };
  } else if (status >= 200 && status <= 299) {
    return {
      status: status,
      group: "Successful",
      hexColor: "#E5A41F"
    };
    
  } else if (status >= 300 && status <= 399) {
    return {
      status: status,
      group: "Redirection",
      hexColor: "#FB0417"
    };
    
  } else if (status >= 400 && status <= 499) {
    return {
      status: status,
      group: "Client error",
      hexColor: "#036E7B"
    };
    
  } else  {
    return {
      status: status,
      group: "Server error",
      hexColor: "#5C003A"
    };
  }
}