<?php
    class Comments_model extends CI_Model
    {
        public function __construct()
        {
            $this->load->database();
        }
        public function getComments()
        {
            $query = $this->db->get('yuchun_board');
            return $query->result_array();
        }
        public function getUsername()
        {
            return '';
        }
        public function getLastID()
        {
            $query = $this->db->query('SELECT * FROM yuchun_board WHERE ID = (SELECT MAX(ID) FROM yuchun_board)');
            $row = $query->result_array();
            if (isset($row))
            {
                return $row[0]['ID'];//???????
            }
        }
        public function insertComment($nickname, $content, $parent, $timestamp)
        {
            $data = array(
                'user' => $nickname,
                'content' => $content,
                'parent' => $parent,
                'timestamp' => $timestamp
            );
            return $this->db->insert('yuchun_board', $data);
        }
        public function deleteComment($deleteId)
        {
            return $this->db->delete('yuchun_board', array('ID' => $deleteId)); 
        }
        public function updateComment($updateId, $updateComment, $timestamp){
            $updatedata = array(
                'content' => $updateComment,
                'timestamp' => $timestamp
            );
            $this->db->where('ID', $updateId);
            return $this->db->update('yuchun_board', $updatedata);
        }
    }
?>