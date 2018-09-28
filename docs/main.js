
var reader = new FileReader();

$(function(){
  //画像ファイルプレビュー表示
  $('#upload').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        $preview = $(".preview");
        t = this;

    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }

    reader.onload = (function(file) {
      return function(e) {
        $preview.empty();
        $preview.append($('<img>').attr({
                  src: e.target.result,
                  width: "150px",
                   class: "preview",
                  title: file.name
              }));
      };
    })(file);

    reader.readAsDataURL(file);
  });

  $('#submit').on('click', function(e) {

    // 目視確認用
    $('#image').val(reader.result);

    // API呼び出し
    //$.post('https://example.com/endpoint', { image: reader.result });
      var result = {
         answer: 'flower',
         success: true,
      };
      //var result = {
      //   answer: null,
      //   success: false,
      //};

    // 結果をhistoryに追加
      if (result.success) {
        $('#errorMessage').hide();
        $('#history').prepend("<li>" + result.answer + "</li>");
      } else {
        $('#errorMessage').show();
      }
  });
});

