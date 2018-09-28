$(function(){
  //画像ファイルプレビュー表示
  $('#upload').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        reader = new FileReader(),
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

    // どこかにセットする
    $('#image').val(reader.result);
  });
});

