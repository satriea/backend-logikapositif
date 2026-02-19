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
    const { title, subtitle, tag, color, content } = req.body;
    try {
      const sql =
        'INSERT INTO books (title, subtitle, tag, color, content) VALUES (?, ?, ?, ?, ?)';
      const [result] = await pool.query(sql, [
        title,
        subtitle,
        tag,
        color,
        content
      ]);
      res.status(201).json({
        id: result.insertId,
        message: 'Karya berhasil dipublikasikan!'
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Gagal menyimpan data', message: err.message });
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
