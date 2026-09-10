export interface CustomerRegistrationData {
  firstName: string;
  lastName: string;
  companyandlegal : string;
  email: string;
  password: string;
 
}

function uniqueSuffix(workerIndex: number): string {
  return `${workerIndex}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function buildCustomerRegistrationData(
  workerIndex = 0,
): CustomerRegistrationData {
  const suffix = uniqueSuffix(workerIndex);

  return {
    firstName: 'QA',
    lastName: `Customer${suffix}`,
    companyandlegal :`Company ${suffix}`,
    email: `your.email+customer${suffix}@gmail.com`,
    password: 'FakeData!44336',
    
  };
}



