/*jslint browser: true*/
/*global $*/
var DROPBEAT = (function (module) {
    'use strict';

    module.notification = {};

    module.notification.manager = {
        init: function () {},

        getWrapper: function (elem) {
            return $(elem).find('.notifyjs-wrapper');
        },

        hide: function (elem) {
            var that = this;

            that.getWrapper(elem).trigger('notify-hide');
        },

        onclick: function (elem, callback) {
// This method will attach click event to whole notification box
// regardless of original click event in `notifyjs`.
            var that = this,
                box = that.getWrapper(elem);

            box.unbind('click');
            box.click(callback);
        },

        getMessage: function (key) {
            return module.s.notifyMessage.get(key);
        },

        playlistChangeNotify: function (success) {
            var that = this;

            if (success) {
                $.notify(
                    that.getMessage('added'),
                    {
                        position: 'top right',
                        className: 'success',
                        autoHide: 'true'
                    }
                );
            } else {
                $.notify(
                    that.getMessage('alreadyOnPlaylist'),
                    {
                        position: 'top right',
                        className: 'warn',
                        autoHide: 'true'
                    }
                );
            }
        },

        sharePlaylist: function (success, url) {
            var that = this,
                msg = success ?
                        that.getMessage('shared') + url :
                            that.getMessage('cannotShare'),
                style = success ? 'success' : 'warn';

            $('.playlist-section .playlist-footer').notify(
                msg,
                {
                    position: 'top left',
                    className: style,
                    autoHide: true,
                    autoHideDelay: 10000,
                    clickToHide: false
                }
            );
        },

        playlistLoaded: function () {
            var that = this;

            $.notify(
                that.getMessage('loaded'),
                {
                    position: 'top right',
                    className: 'success',
                    autoHide: true
                }
            );
        },

        playlistCleared: function () {
            var that = this;

            $('.clear-playlist-button').notify(
                that.getMessage('cleared'),
                {
                    position: 'top right',
                    className: 'success',
                    autoHide: true
                }
            );
        },

        invalidAdderUrl: function () {
            var that = this;

            $('#add-by-url-input').notify(
                that.getMessage('invalidUrl'),
                {
                    position: 'bottom left',
                    className: 'error',
                    autoHide: true
                }
            );
        },

        inSharedPlaylist: function () {
            var that = this;

            $.notify(
                that.getMessage('inSharedPlaylist'),
                {
                    position: 'bottom left',
                    className: 'success',
                    clickToHide: true,
                    autoHide: false
                }
            );
        },

        notPlayable: function (title) {
            var that = this;

            $.notify(
                that.getMessage('notPlayable') + title.slice(0, 40) + '...',
                {
                    position: 'top right',
                    className: 'error',
                    clickToHide: true,
                    autoHide: true,
                    autoHideDelay: 10000
                }
            );
        },

        artistUrl: function (artist, url) {
            var that = this;

            $('.input-field-suppliment').notify(
                artist + that.getMessage('artistUrl') + url,
                {
                    position: 'top right',
                    className: 'info',
                    clickToHide: false,
                    autoHide: true,
                    autoHideDelay: 60000
                }
            );
        }
    };

    module.notification.message = (function () {
        var EN = {
                added: 'Music added',
                alreadyOnPlaylist: 'Already on playlist',
                shared: 'Share this URL to your friends! \n',
                loaded: 'Playlist loaded!',
                cleared: 'Playlist cleared!',
                invalidUrl: 'URL not supported!',
                inSharedPlaylist: 'You are on shared playlist. \n'
                    + 'All changes in this playlist will not affect yours.\n'
                    + 'If you want to make your own playlist, access to '
                    + module.host,
                notPlayable: 'This track is currently unavailable '
                    + 'because of trouble in soundcloud : ',
                cannotShare: 'You cannot share an empty playlist',
                artistUrl: ' full album : '
            };

        return {
            get: function (key) {
// Message translation is currently disabled so that this method
// only returns `English` messages.
                return EN[key];
            }
        };
    }());

    return module;
}(DROPBEAT));
