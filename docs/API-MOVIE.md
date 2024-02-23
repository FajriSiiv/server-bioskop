# Dokumentasi Movie Endpoint API

Berikut adalah daftar endpoint API yang tersedia:

## ENDPOINT MOVIE

### 1. \*\*GET `/movie` mengambil data Movie.

```json
{
  "message": " YOUR DATA MOVIE "
}
```

### 2. \*\*GET `/movie/:movieId` mengambil data Movie ID.

```json
{
  "message": " YOUR DATA MOVIE "
}
```

### 3. \*\*POST `/movie` membuat data Movie.

```json
{
  "message": "Film berhasil dibuat!"
}
```

### 4. \*\*DELETE `/movie/:movieId` menghapus single data Movie.

```json
{
  "message": "Film berhasil dihapus!"
}
```

## ENDPOINT TICKET

### 1. \*\*GET `/ticket` Mengambil semua data ticket.

```json
{
  "data": "YOUR DATA'S TICKET"
}
```

### 2. \*\*GET `/ticket/:ticketId` Mengambil single data ticket.

```json
{
  "data": "YOUR SINGLE DATA TICKET"
}
```

### 3. \*\*POST `/ticket` Membuat ticket.

```json
{
  "message": "Tiket berhasil dibuat!"
}
```

### 4. \*\*DELETE `/ticket/:ticketId` menghapus single data Ticket.

```json
{
  "message": "Tiket berhasil dihapus!"
}
```
