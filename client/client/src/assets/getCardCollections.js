const placeholderImages = [
  "/img/%20section5/image1.png",
  "/img/%20section5/image2.png",
  "/img/%20section5/image3.png",
  "/img/%20section5/image4.png",
  "/img/%20section5/image5.png",
  "/img/%20section5/image6.png",
];


const getCardCollections = async () => {
  try {
    const response = await fetch(`http://localhost:49002/api/catalog/get_all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const serverData = await response.json();

    const transformedData = serverData.map(item => ({
      id: item.id,
      landlord_userid: item.landlord_userid,
      img: item.image || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      title: item.name,
      description: item.about || "No description available",
      phone: item.landlord_number || "No phone number available",
      price: `$${Number(item.price).toLocaleString()}`
    }));
    return transformedData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default getCardCollections;
