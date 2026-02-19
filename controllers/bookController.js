const pool = require('../db');

const bookController = {
  // Ambil semua buku
  getAllBooks: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM books ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Gagal mengambil data', message: err.message });
    }
  },

  // Tambah buku baru
  createBook: async (req, res) => {
    // 1. Ambil 'image' juga dari req.body
    const { title, subtitle, tag, color, content, image } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Validasi sederhana
    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan konten wajib diisi!' });
    }

    try {
      // 2. Tambahkan kolom 'image' di query SQL
      const sql =
        'INSERT INTO books (title, subtitle, tag, color, content, image) VALUES (?, ?, ?, ?, ?, ?)';

      const [result] = await pool.query(sql, [
        title,
        subtitle,
        tag,
        color,
        content,
        imagePath
      ]);

      res.status(201).json({
        id: result.insertId,
        message: 'Karya berhasil dipublikasikan!',
        imageUrl: imagePath,
        data: { title, tag }
      });
    } catch (err) {
      console.error('DB Error:', err);
      res.status(500).json({
        error: 'Gagal menyimpan data ke database',
        message: err.message
      });
    }
  },

  // Hapus buku berdasarkan ID
  deleteBook: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
      }
      res.json({ message: 'Buku berhasil dihapus' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Gagal menghapus data', message: err.message });
    }
  }
};

module.exports = bookController;
