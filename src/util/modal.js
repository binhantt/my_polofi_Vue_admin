import $ from 'jquery';

const modaljs = () => {
  const open = () => {
    $('.thaotac').click(function() {
        var id = $(this).attr('id'); 
      $('.' + id).removeClass('hidden');
    });
  };
  const close =()=>{
    $(".thao-tac").click (function(){
      var id = $(".close").attr("id"); 
      console.log(id)
      $('.' + id).addClass('hidden'); 
    })
  }
  open();
  close();
};
export default modaljs;
