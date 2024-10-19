const axios = require("axios");
require("dotenv").config();

const wpUrl = process.env.WP_URL;
const username = process.env.WP_USERNAME;
const applicationPassword = process.env.WP_APPLICATION_PASSWORD;

if (!wpUrl || !username || !applicationPassword) {
  console.error("Lütfen tüm gerekli değişkenleri .env dosyasında ayarlayın.");
  process.exit(1);
}

async function createPost(title, content) {
  try {
    const response = await axios.post(
      `${wpUrl}/wp-json/wp/v2/posts`,
      {
        title: title,
        content: content,
        status: "publish",
      },
      {
        auth: {
          username: username,
          password: applicationPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Yazı oluşturma hatası: ${error.message}`);
    if (error.response) {
      console.error(`Durum: ${error.response.status}`);
      console.error(`Veri: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

createPost("Test Başlık", "Test İçerik")
  .then((post) => {
    console.log("Yazı başarıyla oluşturuldu:", post.id);
  })
  .catch((error) => {
    console.error("Yazı oluşturma sırasında hata oluştu:", error);
  });
