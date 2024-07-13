export const getUserDataFromSession = () => {
    const storedData = sessionStorage.getItem('userProfile');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() < parsedData.expirationTime) {
        return parsedData.userData;
      } else {
        sessionStorage.removeItem('userProfile');
      }
    }
    return null;
  };