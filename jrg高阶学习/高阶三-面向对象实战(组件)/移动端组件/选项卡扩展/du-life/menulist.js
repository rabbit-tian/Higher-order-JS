'use strict';

(function () {
	//clean index sessionStorage
	sessionStorage.removeItem('dsh_index_goods_type');
	sessionStorage.removeItem('dsh_index_max_page');
	sessionStorage.removeItem('dsh_index_page');
	sessionStorage.removeItem('dsh_index_scrollTop');
    deleteSessionStorage()
    function deleteSessionStorage() {
        sessionStorage.removeItem('location');
        sessionStorage.removeItem('max_price');
        sessionStorage.removeItem('min_price');
        sessionStorage.removeItem('firstCat');
        sessionStorage.removeItem('secondCat');
        sessionStorage.removeItem('default');
        sessionStorage.removeItem('order_price');
        sessionStorage.removeItem('old_level');
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('p');
        sessionStorage.removeItem('totalPage');
        sessionStorage.removeItem('searchKey');
        sessionStorage.removeItem('scrollTop');
    }
	//html first load ,setting defalut mark value
	// if(!sessionStorage.dushenghuo_goodslist_mark){
	// 	sessionStorage.dushenghuo_goodslist_mark = 1;
	// }
	var salebuyHtml = '<div class="sale-buy-mask">\n                                <h1>\u8BF7\u9009\u62E9\u53D1\u5E03\u7C7B\u578B</h1>\n                                <div class="boxlist">\n                                    <a href="/Publish/add/type/1" class="box sale">\u51FA\u552E</a>\n                                    <a href="/Publish/add/type/2" class="box buy">\u6C42\u8D2D</a>\n                                </div>\n                                <div class="salebuy-close"></div>\n                            </div>';
	var salebuy;
	$('#js_go_publish').on('tap', function () {
		salebuy = new alertTips();
		salebuy.toshow({
			html: salebuyHtml
		});
	});
	$('body').on('tap', '.salebuy-close', function () {
		salebuy.tohide();
	});
	//set img
	var setImg = function setImg(mark) {
		$('#menu_mark_' + mark).find('img').each(function () {
			var _this = $(this),
			    _oriSrc = _this.attr('src'),
			    _src = _this.data('src');
			if (!_this.hasClass('hasImg')) {
				_this.addClass('hasImg').attr('src', _src);
				_this[0].onerror = function () {
					_this.attr('src', _oriSrc);
				};
			}
		});
	};
	setImg(1);
	$('#menu_mark_1').removeClass('dis');
	//load after add act

	var nav_list_a = $('#nav_list a');

	nav_list_a
	.on('tap', function () {
		var _this = $(this);
		var _mark = _this.data('mark');
		if (!_this.hasClass('act')) {
			_this.addClass('act').siblings('a').removeClass('act');
			$('#menu_mark_' + _mark).removeClass('dis').siblings('ul').addClass('dis');
			setImg(_mark);
			//sessionStorage.dushenghuo_goodslist_mark = _mark;
		}
	});
	//sessionStorage.lastname="Smith";
})();
