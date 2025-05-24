export const fetchProgressData = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:8005/api/progress/progress/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return { data: data.data || [], error: null };
    } else {
      return { data: [], error: data.error || "Failed to fetch progress" };
    }
  } catch (error) {
    return { data: [], error: error.message || "Network error" };
  }
};