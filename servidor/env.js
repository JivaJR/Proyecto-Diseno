const env = {
    PORT: process.env.PORT || 8050,
    HOST: process.env.HOST || 'diseno-db.cfblivji1aj6.us-east-1.rds.amazonaws.com',
    DATABASE: process.env.DATABASE || "disenodb",
    USER: process.env.USER || "admin",
    PASSWORD: process.env.PASSWORD || "DisenodbAndrea123",
    TABLE: "gpspostion"
}

export default env;