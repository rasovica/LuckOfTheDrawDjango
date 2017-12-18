if (!String.prototype.format) {
    String.prototype.format = function() {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

input_snipet = `<div id="option" class="col-lg-12">
                    <div class="delete" id="delete{0}" onclick="delete_row(this)">
                        <div class="button_base deleter">
                            <div>X</div>
                        </div>
                    </div>
                    <div class="left" style="display: inline-block;">
                        <input type="text" id="option1{0}" class="question" name="nme" title="option{0}" required autocomplete="off">
                        <label for="option1{0}"><span>What be thy option?</span></label>
                    </div><div class="right hiddens" id="probHide{0}">
                        <input type="text" id="probability{0}" class="question" title="probability{0}" required autocomplete="off">
                        <label for="probability{0}"><span>Percentlyhood of success?</span></label>
                    </div>
                </div>`;


let curr = 1;
let toggle = false;

$(document).ready(function () {
    $("#add").click(function () {
        curr += 1;
        $("#options").append(input_snipet.format(curr));
        if(!toggle) {$("[id^=\"probHide\"]").hide(); }
    });
    $("#toggle_custom").click(function () {
        if(!toggle){
            $("[id^=\"probHide\"]").show();
            $("#toggle_btn").text("Disable custom probabiltiy");
            toggle = !toggle;
        }else{
            $("[id^=\"probHide\"]").hide();
            $("#toggle_btn").text("Enable custom probabiltiy");
            toggle = !toggle;
        }
    });
    $("#spin").click(function () {
        let choices = "";
        if(!toggle){
            $("input[id^=\"option\"]").each(function() {
                choices += "1:"+$(this).val()+",";
            });
            choices = choices.slice(0, -1);
        }else{
            $("input[id^=\"option\"]").each(function(index) {
                let prob = $("input[id^=\"probability\"]");
                choices += $(prob.get(index)).val()+":"+$(this).val()+",";
            });
            choices = choices.slice(0, -1);
        }

        $.get( "https://l8qdlfzei5.execute-api.us-east-1.amazonaws.com/prod/pickRandom", { choices: choices }, function (data) {
            $("#result").text(data.draw);
        });
    });
    $("[id^=\"probHide\"]").hide();
});
function delete_row(e)
{   debugger;
    e.parentNode.parentNode.removeChild(e.parentNode);
}