# Anchor Security

## React frontend uygulamasının çalıştırılması :
 ```bash
/cd dashboard
npm install
npm run dev
 ```
## Projenin Yaptığı İş : 

Bu proje, verileri bir API'den alarak bir tabloda görüntüleyen bir React dashboard uygulamasıdır. Kullanıcılar,
verileri severity seviyelerine göre filtreleyebilir ve arama yapabilir. 

**Veri Çekme:** axios ile API'den veri çekilir.

**Filtreleme:** Veriler, severite seviyelerine göre (Critical, High, Medium, Low, Informational) filtrelenebilir.

**Arama:** Kullanıcılar tabloyu arayabilir.

**Stil ve Tooltip:** Her severity seviyesi için farklı stil ve tooltip'ler uygulanır.


## Kullanılan Teknolojiler:

-React

-Material UI

-Axios

-React Router

## Cors Config 

vite.config.js dosyasında API URL belirlenir.
