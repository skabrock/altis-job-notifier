export async function fetchData(keyword) {
  const res = await fetch(
    "https://apis.altisexcel.com/Orders/jobs/ads/Search",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        keyword: keyword,
        remoteWorkOptionId: null,
        jobTypeIds: ["Permanent"],
        industryIds: [],
        specializations: [],
        locations: ["Toronto, ON"],
        businessType: null,
      }),
    }
  );

  return await res.json();
}
