const fs = require('fs');

const createFormattedString = (dataArray) => {
  let formattedString = `url;emails;phones;linkedin;facebook;twitter;instagram\n`;

  dataArray.forEach(data => {
    const { url, emails, phones, linkedin, facebook, twitter, instagram } = data;

    const maxLength = Math.max(emails.length, linkedin.length, phones.length, facebook.length, instagram.length, twitter.length);

    for (let i = 0; i < maxLength; i++) {
      formattedString += `${url};${i < emails.length ? emails[i] : ""};${i < phones.length ? phones[i] : ""};${i < linkedin.length ? linkedin[i] : ""};${i < facebook.length ? facebook[i] : ""};${i < twitter.length ? twitter[i] : ""};${i < instagram.length ? instagram[i] : ""}\n`
    }
  });

  return formattedString;
};

const data = [
  {
    url: "https://www.wordstream.com/",
    emails: ["email1@gmail.com", "email2@gmail.com"],
    phones: ["+3809966425", "+123456789"],
    linkedin: ["linkedin.com/profile1", "linkedin.com/profile2", "linkedin.com/profile1"],
    facebook: ["facebook.com/user1", "facebook.com/user2"],
    twitter: ["twitter.com/user1", "twitter.com/user2"],
    instagram: ["instagram.com/user1", "instagram.com/user2"]
  },
  {
    url: "https://www.wordstream.com/",
    emails: ["email1@gmail.com", "email2@gmail.com"],
    phones: ["+3809966425", "+123456789"],
    linkedin: ["linkedin.com/profile1", "linkedin.com/profile2", "linkedin.com/profile1"],
    facebook: ["facebook.com/user1", "facebook.com/user2"],
    twitter: ["twitter.com/user1", "twitter.com/user2"],
    instagram: ["instagram.com/user1", "instagram.com/user2"]
  },
    {
    url: "https://www.wordstream.com/",
    emails: ["email1@gmail.com", "email2@gmail.com"],
    phones: ["+3809966425", "+123456789"],
    linkedin: ["linkedin.com/profile1", "linkedin.com/profile2", "linkedin.com/profile1"],
    facebook: ["facebook.com/user1", "facebook.com/user2"],
    twitter: ["twitter.com/user1", "twitter.com/user2"],
    instagram: ["instagram.com/user1", "instagram.com/user2"]
  },
  // ... (Add more objects if needed)
];

const resultString = createFormattedString(data);

const fileName = 'output.csv';

fs.readFile(fileName, 'utf8', (err, existingData) => {
  if (err) {
    if (err.code === 'ENOENT') {
      fs.writeFile(fileName, resultString, 'utf8', (err) => {
        if (err) {
          console.error('Ошибка при создании файла:', err);
        } else {
          console.log('Файл успешно создан и записан.');
        }
      });
    } else {
      console.error('Ошибка при чтении файла:', err);
    }
  } else {
    // If the file exists, append the new data
    fs.appendFile(fileName, resultString, 'utf8', (err) => {
      if (err) {
        console.error('Ошибка при записи в файл:', err);
      } else {
        console.log('Строка успешно добавлена в файл.');
      }
    });
  }
});
