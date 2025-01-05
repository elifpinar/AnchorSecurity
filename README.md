Proje 2 uygulamadan oluşur. İlki frontend uygulaması ikincisi ise verilen API'ye istek atabilmek amacıyla oluşturulmuş proxy backend uygulamasıdır. Frontend uygulaması üzerinden API'ye istek atarken cors hatası alındığı için proxy backend uygulaması geliştirilmiştir. 

Proxy backend uygulamasının çalıştırılması :

/cd backend 

npm install

node server.js

React frontend uygulamasının çalıştırılması :

/cd dashboard

npm install

npm run dev

Projenin Yaptığı İş
Bu proje, verileri bir API'den alarak bir tabloda görüntüleyen bir React dashboard uygulamasıdır. Kullanıcılar,
verileri severity seviyelerine göre filtreleyebilir ve arama yapabilir. 

Veri Çekme: axios ile API'den veri çekilir.

Filtreleme: Veriler, severite seviyelerine göre (Critical, High, Medium, Low, Informational) filtrelenebilir.

Arama: Kullanıcılar tabloyu arayabilir.

Stil ve Tooltip: Her severity seviyesi için farklı stil ve tooltip'ler uygulanır.

React Router: Sayfalar arası geçiş için kullanılır.


Kullanılan Teknolojiler:

React

Material UI

axios

React Router

