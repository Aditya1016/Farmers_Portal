import axios from 'axios';
export const getCurrentUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile`,{
        withCredentials: true
    })

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Failed to fetch user data');
    }
}

export const loginUser = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-in`, {
      email,
      password
    },{
      withCredentials: true
    })

    if (response.status === 201) {
        console.log("Login successful:", response.data);
        return response;
    } else {
        throw new Error('Login failed');
    }
}

export const createUser = async (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-up`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response;
}