
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


        var endpoint = 'https://hkmb2kebh2.execute-api.ap-northeast-1.amazonaws.com/default';
        var base64 = reader.result.replace(/^data:image\/png;base64,/, '');
        var data = { image: base64 };

        // 目視確認用
        $('#image').val(base64);

        // API呼び出し
        $.ajax({
            type:"post",                // method = "POST"
            url:endpoint,        // POST送信先のURL
            data:JSON.stringify(data),  // JSONデータ本体
            contentType: 'application/json', // リクエストの Content-Type
            dataType: "json",           // レスポンスをJSONとしてパースする
            success: function(json_data) {   // 200 OK時
                $('#errorMessage').hide();
                $('#history').prepend("<li>" + json_data.body + "</li>");
            },
            error: function() {         // HTTPエラー時
                $('#errorMessage').show();
            },
            complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            }
        });

    });
});
