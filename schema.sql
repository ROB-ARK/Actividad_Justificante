CREATE DATABASE IF NOT EXISTS db_utxj_justificantes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_utxj_justificantes;

CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (id_rol, nombre) VALUES 
(1, 'ALUMNO'), 
(2, 'TUTOR'), 
(3, 'DIRECCION')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

CREATE TABLE IF NOT EXISTS carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    siglas VARCHAR(20) NOT NULL,
    director_nombre VARCHAR(150) NOT NULL
);

INSERT INTO carreras (id_carrera, nombre, siglas, director_nombre) VALUES
(1, 'Ingenieria en Tecnologias de la Informacion e Innovacion Digital', 'ITIID', 'Mtra. Altagracia Carrillo Parra')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

CREATE TABLE IF NOT EXISTS estados (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

INSERT INTO estados (id_estado, nombre) VALUES 
(1, 'PENDIENTE_TUTOR'), 
(2, 'PENDIENTE_DIRECCION'), 
(3, 'VALIDADO'), 
(4, 'RECHAZADO')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) UNIQUE NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    id_carrera INT NULL,
    grado_grupo VARCHAR(10) NULL,
    nombre_tutor_padre VARCHAR(150) NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

CREATE TABLE IF NOT EXISTS justificantes (
    id_justificante INT AUTO_INCREMENT PRIMARY KEY,
    folio VARCHAR(30) UNIQUE NULL,
    id_alumno INT NOT NULL,
    fechas_faltas VARCHAR(150) NOT NULL,
    caso_critico ENUM('SI', 'NO') DEFAULT 'NO',
    materias_afectadas TEXT NOT NULL,
    motivo TEXT NOT NULL,
    documento_comprobatorio_url VARCHAR(255) NULL,
    id_tutor_educativo INT NULL,
    id_director INT NULL,
    id_estado INT NOT NULL DEFAULT 1,
    motivo_rechazo TEXT NULL,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_validacion DATETIME NULL,
    vigencia_hasta DATE NULL,
    FOREIGN KEY (id_alumno) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_tutor_educativo) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_director) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados(id_estado)
);
