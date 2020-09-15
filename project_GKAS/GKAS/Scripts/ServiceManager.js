// Service Manager for Restfull api calls.
var ServiceManager = {

    DataType: {
        JSON: 'json',
        Form: 'form',
        Binary: 'binary'
    },

    RequestType: {
        Get: 'GET',
        Put: 'PUT',
        Post: 'POST',
        Delete: 'DELETE'
    },

    // Sends a restfull GET request to a specified URL.
    Get: function (url, async, callback, callbackParam, showOverlay, showLoaderImage, loaderImageTargetElementSelector, cache, crossDomain) {

        var returnValue;

        if (async == undefined) {
            async = false;
        }

        if (crossDomain == undefined) {
            crossDomain = false;
        }

        if (cache == undefined) {
            cache = false;
        }

        if (async && showOverlay) {

           SiteScript.ShowHideBusyOverlay(true);

        } else if (async && showLoaderImage) {

            if (!loaderImageTargetElementSelector) {
                loaderImageTargetElementSelector = '.body-content';
            }

            kendo.ui.progress($(loaderImageTargetElementSelector), true);
        }

        $.ajax({
            url: url,
            headers: {
                'api-security-key': undefined, //sk,
                'contentType': 'application/x-www-form-urlencoded'
            },
            type: ServiceManager.RequestType.Get,
            contentType: 'application/json; charset=utf-8',
            cache: cache,
            async: async,
            crossDomain: crossDomain,
            success: function (result) {
                returnValue = [true, result];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            error: function (req, status, error) {

                returnValue = [false, req.responseText, error];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            complete: function () {

                SiteScript.ShowHideBusyOverlay(false);

                if ($(loaderImageTargetElementSelector).length) {
                    kendo.ui.progress($(loaderImageTargetElementSelector), false);
                }
            },
            ajaxComplete: function () {

               SiteScript.ShowHideBusyOverlay(false);

                if ($(loaderImageTargetElementSelector).length) {
                    kendo.ui.progress($(loaderImageTargetElementSelector), false);
                }
            }
        });

        return returnValue;
    },

    // Sends a restfull POST request to a specified URL with the specified record/data.
    Post: function (url, objData, async, callback, callbackParam, dataType, showOverlay, overlayMessage, showLoaderImage, loaderImageTargetElementSelector) {

        var returnValue;
        var _contentType = 'application/json; charset=utf-8';

        if (async == undefined) {
            async = false;
        }

        if (dataType && dataType == ServiceManager.DataType.Form) {
            var _contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        if (async && showOverlay) {

            SiteScript.ShowHideBusyOverlay(true, overlayMessage);

        } else if (async && showLoaderImage) {

            if (!loaderImageTargetElementSelector) {
                loaderImageTargetElementSelector = '.body-content';
            }

            kendo.ui.progress($(loaderImageTargetElementSelector), true);
        }

        $.ajax({
            url: url,
            headers: {
                'api-security-key': undefined,
            },
            type: ServiceManager.RequestType.Post,
            data: objData,
            contentType: _contentType,
            dataType: ServiceManager.DataType.JSON,
            cache: false,
            async: async,

            success: function (response, status, XHR) {

                returnValue = [true, response, status, XHR];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            error: function (req, status, error) {

                returnValue = [false, req.responseText, error];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            complete: function () {
                SiteScript.ShowHideBusyOverlay(false);

                if ($(loaderImageTargetElementSelector).length) {
                    kendo.ui.progress($(loaderImageTargetElementSelector), false);
                }
            },
            ajaxComplete: function () {
                SiteScript.ShowHideBusyOverlay(false);

                if ($(loaderImageTargetElementSelector).length) {
                    kendo.ui.progress($(loaderImageTargetElementSelector), false);
                }
            }

        });

        return returnValue;
    },

    // Sends a restfull PUT request to a specified URL with the specified record/data.
    Put: function (url, objData, async, callback, callbackParam, dataType, showOverlay, showLoaderImage, loaderImageTargetElementSelector) {


        var returnValue;
        var _contentType = 'application/json; charset=utf-8';

        if (async == undefined) {
            async = false;
        }

        if (dataType && dataType == ServiceManager.DataType.Form) {
            var _contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        } else if (dataType && dataType == ServiceManager.DataType.Binary) {
            var _contentType = 'binary/octet-stream';
        }

        if (async && showOverlay) {
            SiteScript.ShowHideBusyOverlay(true);
        } else if (async && showLoaderImage) {

            if (!loaderImageTargetElementSelector) {
                loaderImageTargetElementSelector = '.body-content';
            }

            kendo.ui.progress($(loaderImageTargetElementSelector), true);
        }

        $.ajax({
            url: url,
            headers: {
                'api-security-key': undefined, //sk,
            },
            type: ServiceManager.RequestType.Put,
            data: objData,
            contentType: _contentType,
            dataType: ServiceManager.DataType.JSON,
            cache: false,
            async: async,

            success: function (response, status, XHR) {

                returnValue = [true, response, status, XHR];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            error: function (req, status, error) {

                returnValue = [false, req.responseText, error];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            complete: function () {
                SiteScript.ShowHideBusyOverlay(false);
            },
            ajaxComplete: function () {
                SiteScript.ShowHideBusyOverlay(false);
            }

        });

        return returnValue;
    },

    // Sends a restfull DELETE request to the specified URL.
    Delete: function (url) {

        var returnValue = [true, ""];

        $.ajax({
            url: url,
            headers: {
                'api-security-key': undefined, //sk,
            },
            type: ServiceManager.RequestType.Delete,
            dataType: ServiceManager.DataType.JSON,
            cache: false,
            async: false,
            success: function (user) {
                returnValue = [true, ""];
            },
            error: function (req, status, error) {
                returnValue = [false, req.responseText];
            }

        });

        return returnValue;
    },

    // Sends a restfull PUT request to Amazon using Pre Signed URL.

    PutObjectToAmazon: function (url, objData, async, callback, callbackParam, callbackProgress, callbackProgressParam, dataType, showOverlay, showLoaderImage, loaderImageTargetElementSelector) {


        var returnValue;
        var _contentType = 'application/json; charset=utf-8';

        if (async == undefined) {
            async = false;
        }

        if (dataType && dataType == ServiceManager.DataType.Form) {
            var _contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        } else if (dataType && dataType == ServiceManager.DataType.Binary) {
            var _contentType = 'binary/octet-stream';
        }

        if (async && showOverlay) {
            SiteScript.ShowHideBusyOverlay(true);
        } else if (async && showLoaderImage) {

            if (!loaderImageTargetElementSelector) {
                loaderImageTargetElementSelector = '.body-content';
            }

            kendo.ui.progress($(loaderImageTargetElementSelector), true);
        }

        $.ajax({
            url: url,
            type: ServiceManager.RequestType.Put,
            data: objData,
            contentType: _contentType,
            processData: false,
            dataType: ServiceManager.DataType.JSON,
            cache: false,
            async: async,
            xhr: function () {
                var jqXHR = null;
                if (window.ActiveXObject) {
                    jqXHR = new window.ActiveXObject("Microsoft.XMLHTTP");
                }
                else {
                    jqXHR = new window.XMLHttpRequest();
                }
                //Upload progress
                jqXHR.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round((evt.loaded * 100) / evt.total);
                        //Do something with upload progress
                        console.log('Uploaded percent', percentComplete);


                        if (callbackProgress != undefined) {
                            callbackProgress(percentComplete, callbackProgressParam);
                        }
                    }
                }, false);
                //Download progress
                jqXHR.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round((evt.loaded * 100) / evt.total);
                        //Do something with download progress
                        console.log('Downloaded percent', percentComplete);
                    }
                }, false);
                return jqXHR;
            },
            success: function (response, status, XHR) {

                returnValue = [true, response, status, XHR];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            error: function (req, status, error) {

                returnValue = [false, req.responseText, error];
                if (callback != undefined) {
                    callback(returnValue, callbackParam);
                }
            },
            complete: function () {
                SiteScript.ShowHideBusyOverlay(false);
            },
            ajaxComplete: function () {
                SiteScript.ShowHideBusyOverlay(false);
            }

        });

        return returnValue;
    },
};