<?php
    class Comments_model extends CI_Model
    {
        public function __construct()
        {
            $this->load->database();
        }
        //拿留言
        public function getComments()
        {
            $query = $this->db->get('yuchun_board');
            return $query->result_array();
        }
        //拿最後一個 ID
        public function getLastID()
        {
            $query = $this->db->query('SELECT * FROM yuchun_board WHERE ID = (SELECT MAX(ID) FROM yuchun_board)');
            $row = $query->result_array();
            if (isset($row))
            {
                return $row[0]['ID'];//???????
            }
        }
        //新增留言
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
        //刪除留言
        public function deleteComment($deleteId)
        {
            return $this->db->delete('yuchun_board', array('ID' => $deleteId)); 
        }
        //更新留言
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