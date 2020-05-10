var perms = {};
perms.admin = {};
perms.admin.true = {};
perms.admin.false = {};


perms.admin.true.can_change_info = false;
perms.admin.true.can_delete_messages = true;
perms.admin.true.can_invite_users = true;
perms.admin.true.can_restrict_members = true;
perms.admin.true.can_pin_messages = true;
perms.admin.true.can_promote_members = false;

perms.admin.false.can_change_info = false;
perms.admin.false.can_delete_messages = false;
perms.admin.false.can_invite_users = false;
perms.admin.false.can_restrict_members = false;
perms.admin.false.can_pin_messages = false;
perms.admin.false.can_promote_members = false;

perms.mute = {};
perms.mute.true = {};
perms.mute.false = {};

perms.mute.false.can_send_messages = false;
perms.mute.false.can_send_media_messages = false;
perms.mute.false.can_send_other_messages = false;
perms.mute.false.can_add_web_page_previews = false;
perms.mute.false.can_send_polls = false;

perms.mute.true.can_send_messages = true
perms.mute.true.can_send_media_messages = true
perms.mute.true.can_send_other_messages = true
perms.mute.true.can_add_web_page_previews = true
module.exports = perms