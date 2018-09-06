const dev = {
    context: 'http://localhost:3000/'
  }
  
  const prod = {
    context: 'http://ec2-18-222-195-187.us-east-2.compute.amazonaws.com:3000/'
  }
  
  export const environment = process.env.NODE_ENV === 'production'
    ? prod
    : dev