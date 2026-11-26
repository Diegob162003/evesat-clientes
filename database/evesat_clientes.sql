-- EVESAT - Módulo Clientes
-- Script para MySQL (AMPPS / phpMyAdmin).
-- Nota: el backend también crea la tabla automáticamente si no existe;
-- este script sirve para crearla a mano o para documentar el modelo.

CREATE DATABASE IF NOT EXISTS evesat_clientes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE evesat_clientes;
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS clientes (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(120) NOT NULL,
  correo          VARCHAR(150) NOT NULL UNIQUE,
  telefono        VARCHAR(30)  NULL,
  eventos         INT          NOT NULL DEFAULT 0,
  estado          ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
  fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO clientes (nombre, correo, telefono, eventos, estado) VALUES
  ('Mariana Pérez',   'mariana@mail.com',    '+57 311 222 3344', 3, 'Activo'),
  ('Familia López',   'lopez@mail.com',      '+57 300 555 1010', 1, 'Activo'),
  ('TechCo S.A.S',    'contacto@techco.com', '+57 601 888 9000', 4, 'Activo'),
  ('J. Vargas',       'jvargas@mail.com',    '+57 312 444 5566', 0, 'Inactivo'),
  ('Camila Restrepo', 'camir@mail.com',      '+57 305 121 3434', 1, 'Activo');
