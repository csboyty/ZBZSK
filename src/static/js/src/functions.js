/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-10-13
 * Time: 上午9:26
 * To change this template use File | Settings | File Templates.
 */
var functions = (function (config) {
    var aLiYun = {
        host: "",
        policy: "",
        accessKey: "",
        signature: "",
        expire: 0
    };

    return {
        /**
         * 显示loading遮盖层
         */
        showLoading: function () {
            $("#loading").removeClass("hidden");
        },
        /**
         * 隐藏loading遮盖层
         */
        hideLoading: function () {
            $("#loading").addClass("hidden");
        },
        /**
         * ajax网络错误处理
         */
        ajaxErrorHandler: function () {
            this.hideLoading();
            $().toastmessage("showErrorToast", config.messages.networkError);
        },
        /**
         * ajax后台返回错误处理
         * @param errorCode {string} 错误代码
         */
        ajaxReturnErrorHandler: function (errorCode) {
            var me = this;
            var message = "";
            switch (errorCode) {
                default :
                    message = config.messages.systemError;
                    break;
            }
            this.hideLoading();
            $().toastmessage("showErrorToast", message);
        },
        generateUniqueFileName: function (filename) {
            var random = Math.floor(Math.random() * 10 + 1) * (new Date().getTime());
            var extPos = filename.lastIndexOf(".");


            // do something with key here
            return filename.substring(0,extPos)+"-"+random + filename.substring(extPos);
        },
        sendRequest: function () {
            var xmlhttp = null,
                serverUrl = config.uploader.getSignatureUrl;

            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if (xmlhttp != null) {
                xmlhttp.open("GET", serverUrl, false);
                xmlhttp.send(null);
                return xmlhttp.responseText
            } else {
                alert("Your browser does not support XMLHTTP.");
            }
        },
        getSignature: function () {
            var now = Date.parse(new Date()) / 1000;
            var body, obj;

            if (aLiYun.expire < now + 3) {
                body = this.sendRequest();
                obj = eval("(" + body + ")");
                aLiYun.host = obj['host'];
                aLiYun.policy = obj['policy'];
                aLiYun.accessKey = obj['accessKey'];
                aLiYun.signature = obj['signature'];
                aLiYun.expire = parseInt(obj['expire']);
                return true;
            }
            return false;
        },
        setUploadParams: function (up,filename,ret) {

            if (ret == false){
                ret = this.getSignature();
            }
            filename=this.generateUniqueFileName(filename);
            var new_multipart_params = {
                'key' : filename,
                'policy': aLiYun.policy,
                'OSSAccessKeyId': aLiYun.accessKey,
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'signature': aLiYun.signature
            };

            up.setOption({
                'url': aLiYun.host,
                'multipart_params': new_multipart_params
            });
        },
        /**
         * plupload版本1.5.7
         * @param params
         * @returns {plupload.Uploader}
         */
        createUploader: function (params) {
            var me=this;
            var uploader = new plupload.Uploader({
                runtimes: "html5,flash",
                multi_selection: params.multiSelection,
                max_file_size: params.maxSize,
                browse_button: params.uploadBtn,
                container: params.uploadContainer,
                multipart_params: params.multipartParams,
                url: config.uploader.url,
                flash_swf_url: config.baseUrl + config.uploader.swfUrl,
                filters: [
                    {title: "Media files", extensions: params.filter}
                ]
            });

            //初始化
            uploader.init();

            //文件添加事件
            uploader.bind("FilesAdded", function (up, files) {
                if (typeof params.filesAddedCb === "function") {
                    params.filesAddedCb(files, up);
                }

                //开始上传
                up.start();
            });

            uploader.bind("BeforeUpload",function(up, file) {
                me.setUploadParams(up, file.name, false);
            });


            //文件上传进度条事件
            uploader.bind("UploadProgress", function (up, file) {
                if (typeof params.progressCb === "function") {
                    params.progressCb(file, up);
                }
            });

            //出错事件
            uploader.bind("Error", function (up, err) {

                var message = err.message;
                if (message.match("Init") == null) {
                    if (message.match("size")) {
                        $().toastmessage("showErrorToast",
                            config.messages.uploadSizeError + config.uploader.sizes.img);
                    } else if (message.match("extension")) {
                        $().toastmessage("showErrorToast",
                            config.messages.uploadExtensionError + config.uploader.filters.img);
                    } else {
                        $().toastmessage("showErrorToast", config.messages.uploadIOError);
                    }
                }

                up.refresh();
            });

            //上传完毕事件
            uploader.bind("FileUploaded", function (up, file, res) {
                if (res.status == 200) {
                    var key=up.getOption("multipart_params")["key"];
                    res.url=aLiYun.host+"/"+key;
                    if (typeof params.uploadedCb === "function") {
                        params.uploadedCb(res, file, up);
                    }
                } else {
                    $().toastmessage(config.messages.errorTitle, config.messages.uploadIOError);
                }
            });


            return uploader;
        }
    }

})(config);
